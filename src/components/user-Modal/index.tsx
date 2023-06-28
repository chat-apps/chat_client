import { Card, CardContent, Modal, Typography, styled } from '@mui/material';

const StyledCard = styled(Card)(() => ({
  maxWidth: 400,
  margin: 'auto',
  marginTop: '25vh',
  backgroundColor: '#111111b5',
  borderRadius: 2,
  outline: 'none',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

const StyledTitle = styled(Typography)(() => ({
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
    marginBottom: '10px',
  color: '#979797db',
}));

const StyledLabel = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: '5px',
  color: '#f6f6f6f2',
}));

const StyledDetail = styled(Typography)(() => ({
  fontSize: 14,
    marginBottom: '15px',
  paddingLeft: 30,
  color: '#bdbdbdf1',
}));

interface User {
  name: string;
  email: string;
}

interface UserDetailsProps {
  user: User;
  visible: boolean;
  handleClose: () => void;
}

function UserDetailsModal({ user, handleClose, visible }: UserDetailsProps) {
  return (
    <Modal open={visible} onClose={handleClose}>
      <StyledCard>
        <CardContent>
          <StyledTitle>My Profile</StyledTitle>
          <StyledLabel>Name:</StyledLabel>
          <StyledDetail>{user.name}</StyledDetail>
          <StyledLabel>Email:</StyledLabel>
          <StyledDetail>{user.email}</StyledDetail>
        </CardContent>
      </StyledCard>
    </Modal>
  );
}

export default UserDetailsModal;
