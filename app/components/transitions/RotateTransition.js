// @ts-nocheck

import { PresenceTransition } from "native-base";

export const RotateTransition = (visible) => {
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
