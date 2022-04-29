import * as React from 'react';
import { useState, useEffect }  from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import CheckLogin from './checkLogin';
import Loading from '../../components/Loading';

// 身分驗證
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

import { useCartContext } from '../../context/CartContext';
import { postOrder } from '../api/webAPI';

// 都成功，返回首頁
import Link from 'next/link';

const steps = ['購物車確認', '寄送資料填寫', '訂單確認'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    // case 9:
    //   return <CheckLogin orderData={orderData} />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState()
  const [loading, setLoading] = useState(false) // 防止連點
  const [orderId, setOrderId] = useState('')

  // 驗證登入用
  const user = useSelector(selectUser)

  const { 
    cart, 
    setCart, 
    cartId, 
    handleAddToCart,
    handleRemoveFromCart,
    totalPrice, 
    setTotalPrice,
    handleChangeCountFromCart,
    orderInfo, setOrderInfo, 
    handleAddOrderProductList, 
    handleOrderPaymentForm,  
    formData, 
    setFormData, 
    handleRemoveCheckout
  } = useCartContext();

  // 管理下一步，應該要在這驗證第二步有沒有驗證
  // ## 做判斷在這做吧
  const handleNext = () => {
    if (activeStep === 0) {
      if (!user) {
        setErrorMessage('請登入後再輸入寄貨資料～')
        return
      }
      handleAddOrderProductList()   // # context
      setActiveStep(activeStep + 1);
    } 
    if (activeStep === 1) {
      // 表單驗證
      if (!handleCheckForm()) {
        setErrorMessage('請輸入每個欄位')
        return
      }
      setActiveStep(activeStep + 1);
    }
    if (activeStep === 2) {
      if (loading) return
      setLoading(true)
      
      postOrder(orderInfo).then(res => {
        setLoading(false)
        if (res.data.ok === 1) {
          handleRemoveCheckout()
          setOrderId(res.data.orderId)
          setActiveStep(activeStep + 1);
        } else if (res.data.ok === 0) {
          setErrorMessage(`很抱歉，目前${res.data.message}`)
        }
      }).catch((err) => {
        setLoading(false)
        if (err.data.ok === 0) {
          setErrorMessage(err.data.message)
          return
        }
        setErrorMessage('發生不知名的錯誤，請聯繫我們')
        return
      })
    }
  };
  
  const handleBack = () => {
    setErrorMessage('');
    setActiveStep(activeStep - 1);
  };

  // 第二步的表單驗證，先寫在這裡
  const handleCheckForm = () => {
    if (formData.name === "" || formData.email === "" || formData.address === "" || formData.phone === "") {
      return false
    }
    return true
  }


  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Container component="main" maxWidth="md" sx={{ mb: 2 }}>
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            訂單結帳
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <React.Fragment>
            {/* 最後面，還沒到最後一步的話顯示 next 或上一步，到最後就顯示訂單資訊 */}
            {activeStep === steps.length ? (
              <React.Fragment>
                { errorMessage && <Alert  sx={{ width: '100%' }} severity="error">{errorMessage}</Alert> }
                <Typography variant="h5" gutterBottom>
                  感謝您的購買！
                </Typography>
                <Typography variant="subtitle1">
                  <p>您的訂單已成功送出，訂單編號 { orderId }</p>
                  <p>請隨時注意您的收貨訊息，蛋糕很香祝您有愉快的一餐！</p>
                </Typography>
                <Link href={`/`}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" sx={{ mt: 3, ml: 1 }} >
                      回到首頁
                    </Button>
                  </Box>
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                { loading && <Loading /> }
                { errorMessage && <Alert  sx={{ width: '100%' }} severity="error">{errorMessage}</Alert> }
                {/* 一到三步驟詳細頁面資訊 */}
                {getStepContent(activeStep)}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      上一步
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? '送出訂單' : '下一步'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
