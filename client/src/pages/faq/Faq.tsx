import { Flex } from "@radix-ui/themes";
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography, useTheme } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function Faq () {
  const theme = useTheme();
    return (
      <>
        <Box
          width="100%"
          height="fit-content"
          sx={{
            backgroundColor: theme.palette.ostudYellowPrimary,
            padding: '1rem',
            marginTop: '1.5rem',
            textAlign: 'center'
          }}
        >
          <Typography variant="h3" sx={{color: '#ffffff'}}>
            Чому саме остуд?
          </Typography>
        </Box>
        <Typography variant="body1" sx={{textAlign: "center", marginTop: '1.5rem'}}>
          <b>"ОСТУД"</b> - це перша в Україні{" "}
          <span style={{ color: theme.palette.ostudGrayPrimary }}>о</span>нлайн{" "}
          <span style={{ color: theme.palette.ostudGrayPrimary }}>c</span>истема{" "}
          <span style={{ color: theme.palette.ostudGrayPrimary }}>т</span>естування та{" "}
          <span style={{ color: theme.palette.ostudGrayPrimary }}>у</span>правління{" "}
          <span style={{ color: theme.palette.ostudGrayPrimary }}>д</span>осягненнями
        </Typography>
        <Flex justify="center">
          <Stack spacing={2} sx={{marginTop: '1.5rem', marginBottom: '1rem'}} maxWidth="50%">
            <Typography variant="body1" sx={{textAlign: "justify"}}>
              Ми створили цю платформу, бо прагнемо покращити навчання в сучасному освітньому просторі.
            </Typography>
            <Typography variant="body1" sx={{textAlign: "justify"}}>
              Ми віримо, що з нашими технологіями та нашими можливостями освітній процесс вийде на новий рівень.
            </Typography>
            <Typography variant="body1" sx={{textAlign: "justify"}}>
              Наш застосунок здатен створювати інтерактивні класи та курси, створювати відео конференції та багато
              іншого.
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Реєстрація для вчителів</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1}>
                  <Typography variant="body1" sx={{textAlign: "justify"}}>
                    Вчителю для того, щоб створити власний профіль достатньо пройти звичайний шлях реєстрації.
                  </Typography>
                  <Typography variant="body1" sx={{textAlign: "justify"}}>
                    Після цього вчитель зможе сторювати класи та курси, видавати завдання та ініціювати відеоконференцію.
                  </Typography>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Реєстрація для учнів</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{marginBottom: '1rem'}}>
                <Stack spacing={1}>
                  <Typography variant="body1" sx={{textAlign: "justify"}}>
                    Учню для того, щоб створити власний профіль достатньо пройти звичайний шлях реєстрації,
                    але треба чекати на запрошувальне посилання від його вчителя.
                  </Typography>
                  <Typography variant="body1" sx={{textAlign: "justify"}}>
                    Після цього учень буде доданий до навчального середовища та буде мати змогу переглядати
                    всю необхідну навчальну інформацію (завдання, тестування тощо), а також надсилати їх вчителю.
                  </Typography>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Підвердження акаунту</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{marginBottom: '1rem'}}>
                <Stack spacing={1}>
                  <Typography color="#d32f2f" variant="body1" sx={{textAlign: "justify"}}>
                    Увага!
                  </Typography>
                  <Typography variant="body1" sx={{textAlign: "justify"}}>
                    Якщо ваш акаунт не буде підтверджено, ні вчитель, ні учень не зможе виконувати ті чи інші операції.
                  </Typography>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Flex>
      </>
    );
}