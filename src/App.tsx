import { useEffect } from "react";
import {
  UIKitProvider,
  TUIChat,
  TUIChatHeader,
  TUIMessageList,
  TUIMessageInput,
} from "@tencentcloud/chat-uikit-react";
import { TUILogin } from "@tencentcloud/tui-core";
import {
  TUIConversationService,
  TUIStore,
  StoreName,
  IConversationModel,
} from "@tencentcloud/chat-uikit-engine";
import { SDKAppID, loginOverseas } from "./api";
import "@tencentcloud/chat-uikit-react/dist/cjs/index.css";
import "./styles.css";

// this code show how to open the first conversation in list
export default function SampleChat() {
  let isFirstRender = true;

  useEffect(() => {
    (async () => {
      init(
        1600074048,
        "zhongle",
        "eJwtjF0LgjAYRv-Lex06l8shdNFVEUJhiQXehFvr7WOONcSK-ntLvXzOeTgf2Ge7oJUWUqABgUm-UUjt8Iw9fl8are5yVE9xOxmDAtJoRghJYhLzwcjOoJWeM8aoVwN1*Pgz-2OMUz4dK6h8uS3LGF9tnhRqtYx0XoV2W*Nxwdeus92mCnV9uNIiMU2m*Ry*Pyy3M3U_"
      );
    })();
    TUIStore.watch(StoreName.CONV, {
      conversationList: onConversationListUpdated,
    });
  }, []);

  function init(SDKAppID: number, userID: string, userSig: string) {
    const loginInfo = {
      SDKAppID,
      userID,
      userSig,
      useUploadPlugin: true,
    };
    TUILogin.login(loginInfo);
  }

  function openChat(conversationID?: string) {
    // 1v1 chat: conversationID = `C2C${userID}`
    // group chat: conversationID = `GROUP${groupID}`
    const userID = "";
    const groupID = "";
    const defaultConversationID = userID ? `C2C${userID}` : `GROUP${groupID}`;
    TUIConversationService.switchConversation(
      conversationID || defaultConversationID
    );
  }

  function onConversationListUpdated(
    conversationList: (typeof IConversationModel)[]
  ) {
    // default open first conversation in list
    if (isFirstRender && conversationList?.length > 0) {
      openChat(conversationList[0].conversationID);
      isFirstRender = false;
    }
  }

  return (
    <div className="App">
      <UIKitProvider>
        <TUIChat>
          <TUIChatHeader />
          <TUIMessageList />
          <TUIMessageInput />
        </TUIChat>
      </UIKitProvider>
    </div>
  );
}
