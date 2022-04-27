import React from "react";
import { AlertDialog, View, Button } from "native-base";

// Providers
import { useCommon } from "../../utils/providers/CommonProvider";

const AlertDialogUnavailable = () => {
  const { alertOpen, setAlertOpen } = useCommon();

  const onClose = () => setAlertOpen(false);

  const cancelRef = React.useRef(null);
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={alertOpen}
      onClose={onClose}
    >
      <AlertDialog.Content bg={"#313544"}>
        <AlertDialog.Header alignSelf={"center"}>
          Unavailable
        </AlertDialog.Header>
        <AlertDialog.Body alignSelf={"center"}>
          This function is currently unavailable.
          <View mt={5} flexDirection={"row"}>
            <Button
              flex={1}
              borderWidth={2}
              bg={"transparent"}
              borderColor={"#656a7a"}
              _pressed={{ bg: "#555a69" }}
              onPress={onClose}
              ref={cancelRef}
            >
              Close
            </Button>
          </View>
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export { AlertDialogUnavailable };
