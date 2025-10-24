import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import type { PodBuildData } from "@/types/PodBuilderData.ts";
import { createPod, updatePod } from "@/api/garageAPI.ts";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface PodBuilderProps {
  editMode: boolean;
  pod?: PodBuildData;
  onClose?: () => void;
}
export default function PodBuilder({
  editMode,
  pod,
  onClose,
}: PodBuilderProps) {
  const MAX_ARMOR_RATING = 5;
  const MIN_ARMOR_RATING = 0;
  const MIN_ENGINE_COUNT = 1;
  const MAX_ENGINE_COUNT = 4;

  let initialState;

  if (editMode && pod) {
    initialState = pod;
  } else {
    initialState = {
      name: "",
      engineCount: MIN_ENGINE_COUNT,
      color: "#000000",
      armorRating: MIN_ARMOR_RATING,
    };
  }

  const [buildData, setBuildData] = useState<PodBuildData>(initialState);

  const navigate = useNavigate();

  const handleBuild = async () => {
    if (editMode) {
      await updatePod(buildData);
      toast.success("Pod updated!");
    } else {
      await createPod(buildData);
      toast.success("Pod created!");
      navigate("/garage");
    }
    // reset fields
    setBuildData(initialState);
    onClose?.();
  };

  return (
    <div className={"h-full grid justify-center items-center"}>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>{editMode ? "Edit" : "Build"} Your Pod</CardTitle>
            <CardDescription className={"grid gap-2"}>
              <p>
                Choose a name, number of engines, color, and the armor rating.
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent className={"grid gap-4"}>
            <div className={"flex gap-4"}>
              <Label htmlFor={"pod-name-input"}>
                Pod Name
                <Input
                  type={"text"}
                  minLength={1}
                  maxLength={20}
                  value={buildData.name}
                  placeholder={"Give it a sick name"}
                  onChange={(event) =>
                    setBuildData((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  id={"pod-name-input"}
                />
              </Label>
            </div>
            <div>
              <Label htmlFor={"pod-color-input"}>
                Pod Color
                <Input
                  type={"color"}
                  id={"pod-color-input"}
                  role={"textbox"}
                  value={buildData.color}
                  onChange={(e) =>
                    setBuildData((prev) => ({
                      ...prev,
                      color: e.target.value,
                    }))
                  }
                ></Input>
              </Label>
            </div>
            <div className={"flex gap-4"}>
              <Button
                onClick={() =>
                  setBuildData((prev) => ({
                    ...prev,
                    engineCount: Math.max(
                      prev.engineCount - 1,
                      MIN_ENGINE_COUNT,
                    ),
                  }))
                }
              >
                {"<-"}
              </Button>
              <Label htmlFor={"engine-count-input"}>
                Engine Count
                <Input
                  type={"number"}
                  min={MIN_ENGINE_COUNT}
                  max={MAX_ENGINE_COUNT}
                  value={buildData.engineCount}
                  id={"engine-count-input"}
                  readOnly={true}
                />
              </Label>
              <Button
                onClick={() =>
                  setBuildData((prev) => ({
                    ...prev,
                    engineCount: Math.min(
                      prev.engineCount + 1,
                      MAX_ENGINE_COUNT,
                    ),
                  }))
                }
              >
                {"->"}
              </Button>
            </div>
            <div className={"flex gap-4"}>
              <Button
                onClick={() =>
                  setBuildData((prev) => ({
                    ...prev,
                    armorRating: Math.max(
                      prev.armorRating - 1,
                      MIN_ARMOR_RATING,
                    ),
                  }))
                }
              >
                {"<-"}
              </Button>
              <Label htmlFor={"armor-rating-input"}>
                Armor Rating
                <Input
                  type={"number"}
                  min={0}
                  max={4}
                  value={buildData.armorRating}
                  id={"armor-rating-input"}
                  readOnly={true}
                />
              </Label>
              <Button
                onClick={() =>
                  setBuildData((prev) => ({
                    ...prev,
                    armorRating: Math.min(
                      prev.armorRating + 1,
                      MAX_ARMOR_RATING,
                    ),
                  }))
                }
              >
                {"->"}
              </Button>
            </div>
          </CardContent>
          <CardFooter className={"flex items-center justify-center"}>
            <Button className={"w-3/5"} onClick={handleBuild}>
              {editMode ? "Update" : "Build"}
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
