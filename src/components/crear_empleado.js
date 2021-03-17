import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
     marginLeft:"100px",
     marginTop:"90px",
     padding:"100px",
     alignItems: "center",
     background: '#ffffff',
    '& .super-app-theme--header': {
      backgroundColor: '#ffffff',
      color: '#ffff',
      display: "flex"
    },
  },
});

export default function Employees() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h2" gutterBottom>
        Crear
      </Typography>
     
      <Typography variant="body1" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>

    </div>
  );
}
