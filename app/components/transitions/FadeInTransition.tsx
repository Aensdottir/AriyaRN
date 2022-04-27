import { PresenceTransition } from "native-base";

export const FadeInTransition = (props: unknown) => {
  return (
    <PresenceTransition
      visible={true}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 2000,
        },
      }}
      {...props}
    />
  );
};
