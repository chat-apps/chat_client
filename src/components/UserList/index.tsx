import { Box, Divider, ListItem, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Avatar from '../Avatar';

interface UserListInterface {
  ID: number;
  userName: string;
  handleOnClick: (args: number) => void;
}
const useStyles = makeStyles(() => ({
  container: {
    marginBottom: 8,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  },
  username: {
    marginLeft: 2,
    color: '#fff',
    fontWeight: 'bold',
  },
  divider: {
    bgcolor: '#515151',
    height: 2,
  },
}));

const UserList = ({ ID, userName, handleOnClick }: UserListInterface) => {
  const classes = useStyles();

  const handleClick = () => {
    handleOnClick(ID);
  };

  return (
    <ListItem button onClick={handleClick} className={classes.container}>
      <Box className={classes.box}>
        <Avatar name={userName} />
        <Typography variant="body1" className={classes.username}>
          {userName}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
    </ListItem>
  );
};

export default UserList;
