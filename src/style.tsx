import styled from "styled-components";
import Typography from "@mui/material/Typography";

export const LineNumber = styled.p`
  margin: 0 0 0 0;
  padding-left: 5px;
  z-index: 0;
`;

export const LineNumberContainer = styled.div`
  width: 40px;
  background-color: #60656e;
  height: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: self-start;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
  background-color: #dddee1;
`;

export const TitleContainer = styled(Typography)`
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
  background-color: #dddee1;
`;
