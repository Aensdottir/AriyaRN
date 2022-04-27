import { PresenceTransition } from "native-base";

export const RotateTransition = (visible: boolean) => {
  return (
    <PresenceTransition
      visible={visible}
      initial={{
        rotate: "0deg",
        opacity: 1,
      }}
      animate={{
        rotate: "180deg",
      }}
    />
  );
};