import { Fragment, ReactElement, useEffect, useRef, useState } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service"
import { Startup } from "../../Types/Startup";
import Card from '@mui/material/Card';
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";
import Pagination from '@mui/material/Pagination';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      margin: theme.spacing(2),
    },
    card: {

    },
  })
);

export default function StartupList(): ReactElement {
  const classes = useStyles()
  const [startups, setStartups] = useState<Startup[]>([])
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const initial = (page - 1) * 20
  const currentStartups = startups.slice(initial, initial + 20)
  const pageCount = startups.length / 20

  useEffect(() => {
    StartupHttpService.getStartups().then((response) => {
      setStartups(response)
    }).catch(err => {
      console.error()
    })
  }, [])

  return (
    <div>
      <Pagination count={pageCount} page={page} onChange={handleChange} />
      {currentStartups.map((startup) => (
        <StartupCard startup={startup} />
      )
      )}
      
    </div>
  )


}

const StartupCard: React.FC<{ startup: Startup }> = ({ startup }) => {
  return (
    <Card sx={{ flexDirection: 'column' }}>
      <div key={startup.id}>
        <div>
          {startup.name}
        </div>
        <div>
          {startup.dateFounded.getFullYear()}
          {startup.employees}
          {startup.totalFunding}
          {startup.currentInvestmentStage}
        </div>
        <div>
          {startup.shortDescription}
        </div>
      </div>
      )
    </Card>
  )
}


