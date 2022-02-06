// @ts-nocheck
import { Input } from "native-base";

export const LoginInput = (props) => {
  return (
    <Input margin={2} w={280} borderRadius={8} placeholder="Email" {...props} />
  );
};
