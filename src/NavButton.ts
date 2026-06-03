import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

type NavButtonPropsType ={
  background?: string
}

export const NavButton = styled(Button)<NavButtonPropsType> (({background, theme}) => ({
  minWidth: '90px',
  fontWeight: 'bold',
  // boxShadow: '0 0 0 1px #054B62, 1px 1px 0 0 #054B62',
  borderRadius: '5px',
  // textTransform: 'capitalize',
  margin: '0 10px',
  padding: '8px 24px',
  color: '#ffffff',
  background: background || theme.palette.secondary.main,
}))