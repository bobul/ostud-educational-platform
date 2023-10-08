import styled from "styled-components";
import { useTheme } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";

interface ILandingButtonProps {
    text: string;
    variant?: "primary" | "secondary";
}

export function LandingButton({ text, variant = "primary" }: ILandingButtonProps) {
    const theme = useTheme();

    const StyledButton = styled.button`
    align-self: flex-start;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Ermilov', sans-serif;
    padding: .5em 1.5em;
    border: none;
    border-radius: 1.5rem;
    font-weight: bold;
    color: ${variant === "secondary" ? theme.palette.ostudYellowPrimary : "#ffffff"};
    background-color: ${variant === "secondary" ? "#ffffff" : theme.palette.ostudYellowPrimary};
    transition: all 1000ms;
    font-size: 1.3rem;
    box-shadow: 4px 5px 17px -4px ${theme.palette.ostudYellowPrimary};
    &:hover {
      transform: scale(1.1);
    }
  `;

    return (
        <StyledButton>
            <span>{text}</span>
            <ArrowRight sx={{ marginTop: '.2em' }} />
        </StyledButton>
    );
}
