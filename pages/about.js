import Meta from '../components/Meta'
import {Card, CardMedia, CardContent, Typography} from '@mui/material/';

const about = () => {
  return (
    <div>
      <Meta title='關於 CAKESHOP - CAKESHOP' />
      <Card sx={{ maxWidth: 1200, height: 350 }}>
          <CardMedia
            component="img"
            height="auto"
            image="./img/2200x.webp"
            alt="green iguana"
          />
        </Card>
        <CardContent sx={{ maxWidth: 1200, mb: 10 }}>
        <Typography variant="h2" color="text.secondary">
        關於 CAKESHOP
        </Typography>
        <Typography variant="body1" color="text.secondary">
        我們是選購糕點電商，我們致力於做出美味的糕點，征服這個世界，師傅每天匠心打造優秀的糕點，只為征服你/妳的口
        </Typography>
      </CardContent>
    </div>
  )
}

export default about
