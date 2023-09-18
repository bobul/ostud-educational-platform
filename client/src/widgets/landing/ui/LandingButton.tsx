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
    justify-content: center;
    border: none;
    padding: 0.5rem 1.8rem;
    border-radius: 2.2rem;
    font-family: 'Ermilov', sans-serif;
    font-size: 2rem;
    cursor: pointer;
    background-color: ${theme.palette.ostudYellowPrimary};
    color: #ffffff;
  `;

    const Text = styled.span`
    margin-right: 0.5rem;
  `;

    return (
        <StyledButton>
            <Text>{text}</Text>
            <ArrowRight sx={{marginTop: '.2em'}}/>
        </StyledButton>
    );
}
