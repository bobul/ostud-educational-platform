import styles from "./Landing.module.css"
import { Typography, useTheme, Box } from "@mui/material";
import lamp from "./assets/lamp.png";
import { Flex } from "@radix-ui/themes";
import { LandingButton } from "./ui";
import styled from "styled-components"
import { OstudLink, useAppSelector } from "../../shared";
import { Link } from "react-router-dom";
import { ArrowRight } from "@mui/icons-material";

const LampImage = styled(Box)`
  height: 350px;
  width: 350px;
  filter: drop-shadow(8px 12px 18px black);
`;

export function Landing() {
    const theme = useTheme();
    const {isAuth} = useAppSelector(state => state.userReducer);
    return (
        <Flex
            style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
            className={styles.landing}
        >
            <Flex
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Flex
                    style={{
                        flexDirection: "column",
                        justifyContent: "center",
                    }}>
                    <Typography
                        variant="h1"
                        className={styles.heading}
                        sx={{
                            color: theme.palette.ostudYellowPrimary,
                            textShadow: "4px 5px 2px rgba(0,0,0,0.5)",
                            marginBottom: '.5rem',
                            letterSpacing: '7px',
                        }}
                    >
                        ОСТУД
                    </Typography>
                    <Typography variant="h6"
                                sx={{marginBottom: '.7rem',}}
                    >
                        <span style={{ color: theme.palette.ostudYellowPrimary }}>О</span>нлайн{" "}
                        <span style={{ color: theme.palette.ostudYellowPrimary }}>С</span>истема{" "}
                        <span style={{ color: theme.palette.ostudYellowPrimary }}>Т</span>естування та{" "}
                        <span style={{ color: theme.palette.ostudYellowPrimary }}>У</span>правління{" "}
                        <span style={{ color: theme.palette.ostudYellowPrimary }}>Д</span>осягненнями
                    </Typography>
                    <Flex
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <LandingButton text="Ознайомитись"/>

                        {isAuth ?
                            <Link to={'/profile'}
                                  style={{textDecoration: "none"}}>
                                <LandingButton text="Розпочати подорож"
                                               variant="secondary"/>
                            </Link>
                            :
                            <Link to={'/sign-up'}
                                  style={{textDecoration: "none"}}>
                                <LandingButton text="Розпочати подорож"
                                               variant="secondary"/>
                            </Link>
                        }
                    </Flex>
                </Flex>
                <LampImage component="img"
                           className={styles.lampImage}
                           src={lamp}
                           alt="Lamp"
                />
            </Flex>
        </Flex>
    )
}
