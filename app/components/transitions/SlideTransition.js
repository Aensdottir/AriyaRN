// @ts-nocheck

import { PresenceTransition } from "native-base";

export const SlideTransition = (props) => {
  return (
    <PresenceTransition
      initial={{
        translateY: 227,
      }}
      animate={{
        translateY: 215,
        transition: {
          duration: 1000,
        },
      }}
      {...props}
    />
  );
};
