import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function Counter({ quantity, setQuantity }){
  const handleCount = (type) => {
    if (type === 'minus') {
      setQuantity(Math.max(quantity - 1, 1));
    }

    if (type === 'plus') {
      setQuantity(Math.max(quantity + 1, 0));
    }
  }
  
  return( 
    <ButtonGroup
      sx={{ 
      }}>
      <Button
        sx={{ 
          width: '40px'
        }}
        onClick={() => {
          handleCount('minus')
        }}
      >
        <RemoveIcon fontSize="small" />
      </Button>
      <Button
        sx={{ 
          width: '60px'
        }}>
        {quantity}
      </Button>
      <Button
        sx={{ 
          width: '40px'
        }}
        onClick={() => {
          handleCount('plus')
        }}
      >
        <AddIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  )
}