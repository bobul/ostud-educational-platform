import styles from "./Landing.module.css"
import {Typography, useTheme, Box} from "@mui/material";
import lamp from "./assets/lamp.png";
import {Flex} from "@radix-ui/themes";
import styled from "styled-components"
import {LandingButton} from "./ui";

const LampImage = styled(Box)`
  height: 500px;
  width: 500px;
  filter: drop-shadow(8px 12px 18px black);
`;

export function Landing() {
    const theme = useTheme();
    return (
        <Flex
            style={{
                justifyContent: "space-around",
                alignItems: "center",
            }}
            className={styles.landing}
        >
            <Box>
                <Typography
                    variant="h1"
                    sx={{
                        color: theme.palette.ostudYellowPrimary,
                        textShadow: "4px 5px 2px rgba(0,0,0,0.5)",
                        marginBottom: '.5rem',
                        letterSpacing: '7px'
                    }}
                >
                    ОСТУД
                </Typography>
                <Typography variant="h4"
                            sx={{
                                color: theme.palette.ostudGraySecondary,
                                marginBottom: '.7rem',
                            }}>
                    Онлайн Система Тестування та Управління Досягненнями
                </Typography>
                <LandingButton text="Ознайомитись"/>
            </Box>
            <LampImage component="img"
                       className={styles.lampImage}
                       src={lamp}
                       alt="Lamp"/>
        </Flex>
    )
}
