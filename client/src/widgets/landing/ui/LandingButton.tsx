import styled from "styled-components";
import { useTheme } from "@mui/material";
import {ArrowRight} from "@mui/icons-material";

interface ILandingButtonProps {
    text: string;
}

export function LandingButton({ text }: ILandingButtonProps) {
    const theme = useTheme();

    const StyledButton = styled.button`
      display: flex;
      align-items: center;
      -webkit-text-stroke: .3px rgb(238, 191, 0);             
      justify-content: center;
      font-family: 'Ermilov', sans-serif;
      padding: .5em 1.5em;
      border: none;
      border-radius: 1.5rem;
      font-weight: bold;
      color: ${theme.palette.ostudYellowPrimary};
      background-color: #ffffff;
      transition: all 1000ms;
      font-size: 1.3rem;
      position: relative;
      overflow: hidden;
      outline: 2px solid ${theme.palette.ostudYellowPrimary};
      &:hover {
        color: #ffffff;
        transform: scale(1.1);
        outline: 2px solid #fdd955;
        -webkit-text-stroke: unset;
        box-shadow: 4px 5px 17px -4px ${theme.palette.ostudYellowPrimary};
      }
      &::before {
        content: "";
        position: absolute;
        left: -50px;
        top: 0;
        width: 0;
        height: 100%;
        background-color: ${theme.palette.ostudYellowPrimary};
        transform: skewX(45deg);
        z-index: -1;
        transition: width 1000ms;
      }
      &:hover::before {
        width: 250%;
      }
  `;

    return (
        <StyledButton>
            <span>{text}</span>
            <ArrowRight sx={{marginTop: '.2em'}}/>
        </StyledButton>
    );
}
