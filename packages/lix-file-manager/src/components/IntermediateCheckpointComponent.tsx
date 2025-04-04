import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import ChangeDot from "./ChangeDot.tsx";
import IconChevron from "@/components/icons/IconChevron.tsx";
import clsx from "clsx";
import { checkpointChangeSetsAtom, intermediateChangeIdsAtom, intermediateChangesAtom } from "@/state-active-file.ts";
import { useAtom } from "jotai/react";
import { Input } from "./ui/input.tsx";
import { saveLixToOpfs } from "@/helper/saveLixToOpfs.ts";
import { createDiscussion, UiDiffComponentProps } from "@lix-js/sdk";
import { createCheckpoint } from "@/helper/createCheckpoint.ts";
import { lixAtom } from "@/state.ts";
import { ChangeDiffComponent } from "./ChangeDiffComponent.tsx";

export const IntermediateCheckpointComponent = () => {
  const [isExpandedState, setIsExpandedState] = useState<boolean>(false);
  const [intermediateChanges] = useAtom(intermediateChangesAtom);
  const [checkpointChangeSets] = useAtom(checkpointChangeSetsAtom);

  // Don't render anything if there's no change data
  if (intermediateChanges.length === 0) {
    return null;
  }

  // Group changes by plugin_key
  const groupedChanges = intermediateChanges.reduce((acc: { [key: string]: UiDiffComponentProps["diffs"] }, change) => {
    const key = change.plugin_key;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(change);
    return acc;
  }, {});

  return (
    <div
      className="flex group hover:bg-slate-50 rounded-md cursor-pointer flex-shrink-0 pr-2"
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName !== "INPUT") {
          e.stopPropagation();
          setIsExpandedState(!isExpandedState);
        }
      }}
    >
      <ChangeDot top={false} bottom={checkpointChangeSets.length > 0} highlighted />
      <div className="flex-1 z-10">
        <div className="h-12 flex items-center w-full gap-2">
          <p className="flex-1 truncate text-ellipsis overflow-hidden">
            Intermediate changes{" "}
          </p>
          <div className="flex gap-3 items-center">
            <Button variant="ghost" size="icon">
              <IconChevron
                className={clsx(
                  isExpandedState ? "rotate-180" : "rotate-0",
                  "transition"
                )}
              />
            </Button>
          </div>
        </div>
        {isExpandedState && (
          <div className="flex flex-col gap-2 pb-2">
            <div className="flex flex-col justify-center items-start w-full gap-4 sm:gap-6 pt-2 pb-4 sm:pb-6 overflow-hidden">
              <CreateCheckpointInput />
              {Object.keys(groupedChanges).map((pluginKey) => (
                <ChangeDiffComponent
                  key={pluginKey}
                  diffs={groupedChanges[pluginKey]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntermediateCheckpointComponent;

const CreateCheckpointInput = () => {
  const [description, setDescription] = useState("");
  const [lix] = useAtom(lixAtom);
  const [intermediateChangeIds] = useAtom(intermediateChangeIdsAtom);

  const handleCreateCheckpoint = async () => {
    const changeSet = await createCheckpoint(lix, intermediateChangeIds);
    if (description !== "") {
      await createDiscussion({
        lix,
        changeSet,
        firstComment: { content: description },
      });
      await saveLixToOpfs({ lix });
    }
  };

  return (
    <div className="flex w-full gap-2 px-1 items-center">
      <Input
        className="flex-grow pl-2"
        placeholder="Describe the changes"
        onInput={(event: any) => setDescription(event.target?.value)}
      ></Input>
      <Button
        onClick={handleCreateCheckpoint}
        variant="default"
      >
        {description === "" ? "Create checkpoint without description" : "Create checkpoint"}
      </Button>
    </div>
  );
};