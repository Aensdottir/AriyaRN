// @ts-nocheck

import { PresenceTransition } from "native-base";

export const SlideTransition = (props) => {
  return (
    <PresenceTransition
      initial={{
        translateY: 2,
      }}
      animate={{
        translateY: 2,
        transition: {
          duration: 1000,
        },
      }}
      {...props}
    />
  );
};
