import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {

  const [isDisabled, setDisabled]=useState(false);
  const [recipientedId, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [feedback, setFeedback]=useState("");
  const [hidden, setHidden]=useState(true);

  async function handleClick() {
    setHidden(true);
    setDisabled(true);
    const recipient = Principal.fromText(recipientedId);
    const amountToTransfer = Number(amount);


    const authClient=await AuthClient.create();
    const identity=await authClient.getIdentity();

    const authenticatedCanister=createActor(canisterId,{
      agentOptions:{
        identity,
      },
    })

    const result= await authenticatedCanister.transfer(recipient, amountToTransfer);
    setFeedback(result);
    setHidden(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientedId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" 
          onClick={handleClick}
          disabled={isDisabled} >
            Transfer
          </button>
        </p>
        <p hidden={hidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
