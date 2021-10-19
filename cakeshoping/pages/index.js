import { server } from '../config';
import styled from 'styled-components';
import Meta from '../components/Meta';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProjectCard from '../components/ProjectCard';
import Divider from '@mui/material/Divider';

const CardSilder = styled.div`
  display: flex;
`;

const ProjectCardList = styled.div`
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
      <Typography
        variant="body"
        color="text.secondary"
        sx={{ display: 'block', pt: 2 }}
      >
        本月甜點
      </Typography>
      <Divider sx={{ pt: 1, mb: 2 }} />
      <ProjectCardList>
        {[
          '十 月 新 品 ＿綠 葡 萄 蜂 蜜 優 格 塔',
          '十 月 新 品＿榛 果 芋 頭 奶 油 塔',
          '九 月 新 品＿白 乳 酪 藍 莓 塔',
          '榛果脆脆生巧克力塔',
        ].map((text) => (
          <ProjectCard key={text} title={text} />
        ))}
      </ProjectCardList>
    </div>
  );
}
