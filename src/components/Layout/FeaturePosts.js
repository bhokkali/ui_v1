import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import teachApp from '../../assets/images/teach-app.jpg'
import parentApp from '../../assets/images/parents-app.png'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  }
  
}));

const featuredPosts = [
    {
      title: 'Parents App',
      date: 'Available on Google play store',
      description: [
        'School calendar and circular',
        'Grade time table',
        'Student attendance',
        'Exams and time table',
        'Student reports'
      ],
      imageUrl: parentApp
    },
    {
      title: 'Teachers App',
      date: 'Available on Google play store',
      description: [
        'School calendar and circular',
        'Teacher time table',
        'Grade time table',
        'Feed student attendance',
        'Feed exam marks & reports'
      ],
      imageUrl: teachApp
    },
  ];

export default function FeaturePosts(props) {
   const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container spacing={4}>
            {featuredPosts.map(post => (
              <Grid item key={post.title} xs={12} md={6}>
                <CardActionArea component="a" href="#">
                  <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography component="h2" variant="h5">
                          {post.title}
                        </Typography>
                        {/*<Typography variant="subtitle1" color="textSecondary">
                          {post.date}
                        </Typography> */}
                        <Typography variant="subtitle1" paragraph>
                          {post.description.map((opt, key) => {
                            return (
                              <div key={key}>{key+1}. {opt}</div>
                            )
                          })}
                        </Typography>
                       {/* <Typography variant="subtitle1" color="primary">
                          Continue reading...
                        </Typography> */}
                      </CardContent>
                    </div>
                    <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        image={post.imageUrl}
                        title="Image title"
                      />
                    </Hidden>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
    )
}