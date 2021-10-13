import { server } from '../config';
import styled from 'styled-components';
import Meta from '../components/Meta';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CardSilder = styled.div`
  display: flex;
`;

export default function Home({ articles }) {
  return (
    <div>
      <Meta />
      <h1>HOME</h1>
      <Button>prev</Button>
      <Button>next</Button>
      <CardSilder>
        <Card sx={{ maxWidth: 600 }}>
          <CardMedia
            component="img"
            height="140"
            image="https://picsum.photos/600"
            alt="green iguana"
          />
        </Card>
        <Card sx={{ maxWidth: 600 }}>
          <CardMedia
            component="img"
            height="140"
            image="https://picsum.photos/600"
            alt="green iguana"
          />
        </Card>
      </CardSilder>
    </div>
  );
}
