import styled from "styled-components";
import Typography from "@mui/material/Typography";

export const LineNumber = styled(Typography)`
  margin: 0 0 0 0;
  padding-left: 5px;
  font-size: 15px;
`;

export const LineNumberContainer = styled.div`
  padding-top: 10px;
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
  heigh: 10vh;
  width: 100%;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
  background-color: #dddee1;
`;

export const TitleContainer = styled(Typography)`
  heigh: 10vh;
  padding-top: 10px;
  padding-left: 40px;
  padding-bottom: 10px;
  background-color: #dddee1;
`;
