// @ts-nocheck
import React, { useState, useEffect } from "react";
import { AlertDialog, View, Button } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { SetAlertOpen } from "../../utils/redux/actions";

const AlertDialogUnavailable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  const cancelRef = React.useRef(null);
  const onClose = () => dispatch(SetAlertOpen(false));
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={data.login.alertOpen}
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
