import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import { useMyPokemons } from "../apollo/useMyPokemons";
import { useRouter } from "next/router";

const ModalWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StatusWrapper = styled.div`
  border: 2px solid var(--primary);
  padding: 1rem 2rem;
  font-size: 1rem;
  width: 100%;
  margin-top: -1rem;
  background-color: var(--tertiary);
  color: var(--primary);
  font-weight: 600;
  text-align: center;
`;

const CloseButton = styled.div`
  border: 2px solid var(--tertiary);
  padding: 1rem 2rem;
  font-size: 1rem;
  margin-top: 1rem;
  background-color: var(--primary);
  color: var(--tertiary);
  font-weight: 600;
  text-align: center;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  input {
    border: 2px solid var(--tertiary);
    background-color: var(--bg-color);
    padding: 1rem;
    font-size: 1rem;
    color: inherit;
    font-weight: 600;
    width: 100%;
  }

  button {
    margin-top: 1rem;
    padding: 1rem 2rem;
    widthL auto;
    text-align: right;
    font-size: 1rem;
    background-color: var(--primary);
    border: 2px solid var(--tertiary);
    border-radius: 8px;
    font-weight: 600;
    color: inherit;
    cursor: pointer;

    &:disabled {
      background-color: rgb(167 167 167);
    }
  }

`;

const statuses = {
  getReady: {
    url: "/getReady.webp",
    display: "Getting ready...",
  },
  readyToThrow: {
    url: "/throwing.webp",
    display: "Catching the poke...",
  },
  successCatch: {
    url: "/success.webp",
    display: "Success catch! GG EZ!",
  },
  failCatch: {
    url: "/fail.webp",
    display: "Sorry! Pokemon is too strong to catch",
  },
};

const PokeModal = ({ poke, status, onClose = () => {}, ...props }) => {
  const [name, setName] = React.useState("");

  const router = useRouter();

  const {
    operations: { catchPoke },
  } = useMyPokemons();

  const nameOnChange = (event) => {
    setName(event.target.value);
  };

  const onSave = () => {
    catchPoke({
      name: poke?.name,
      image: poke?.sprites?.front_default,
      nickname: name,
    });

    router.push("/mypokes");
  };

  return (
    <ModalWrapper {...props}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
        `}
      >
        <StatusWrapper>{statuses[status].display}</StatusWrapper>
        <div
          css={css`
            width: 400px;
            height: 350px;
            position: relative;
          `}
          key={statuses[status].name}
        >
          {/* Because loading gif sometimes takes time,
          So I preload this using priority == true */}
          <Image
            alt={statuses[status].name}
            src={statuses[status].url}
            layout="fill"
            objectFit="contain"
            priority={true}
          />
        </div>

        {/* close the modal  */}
        {status === "failCatch" ? (
          <CloseButton onClick={onClose}>Close</CloseButton>
        ) : null}

        {/* save the name  */}
        {status === "successCatch" ? (
          <InputWrapper>
            <input
              onChange={nameOnChange}
              value={name}
              placeholder="Name your poke here.."
            />
            <button disabled={name === ""} onClick={onSave}>
              Submit
            </button>
          </InputWrapper>
        ) : null}
      </div>
    </ModalWrapper>
  );
};

export default PokeModal;
