import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  postText: {
    marginTop: 10,
    fontSize: 15,
    textAlign: 'justify',
    color: '#000000ba'
  }
}));

export default function MainContent(props) {
  const classes = useStyles();
    return (
        <React.Fragment>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                From the Firehose
              </Typography>
              <Divider />
              <Typography>
                  <div className={classes.postText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fermentum neque diam, non sollicitudin ipsum sagittis ac. Aenean auctor ante nisi, in aliquam risus elementum a. Proin vulputate sem porta nibh congue, sit amet faucibus felis pulvinar. Fusce fringilla rutrum nulla, eget maximus libero ornare sed. Aliquam quis aliquam lectus. Curabitur non massa condimentum, suscipit mi id, pretium ante. Ut nec ante eget ex molestie sollicitudin et vitae orci.
              </div>
              <div className={classes.postText}>
            Vestibulum sit amet magna id dui aliquam blandit. Etiam elit leo, mollis non suscipit sed, feugiat scelerisque ipsum. Quisque in venenatis turpis. Quisque sagittis viverra ullamcorper. Quisque mattis molestie sem, at fermentum felis eleifend quis. In in augue porttitor, eleifend magna vitae, euismod mi. Sed a risus non leo finibus venenatis. Nulla suscipit elementum purus auctor vestibulum. Vestibulum a tortor in elit mollis sodales vel a turpis. Duis purus odio, rhoncus sed massa sed, mattis mattis quam. Nulla et euismod lorem. Nunc in mi sem. Morbi molestie suscipit rutrum. In dapibus quis purus a aliquam.
            </div>
            <div className={classes.postText}>
            Morbi at diam maximus, lacinia lacus vitae, aliquet lectus. Donec rhoncus lectus erat, vel laoreet tortor facilisis eu. Nulla facilisi. Nunc pharetra volutpat fringilla. Morbi at velit quis erat ultricies aliquet sed eget nisl. Ut tellus sem, consectetur nec vulputate a, auctor volutpat metus. Suspendisse vel sodales neque, id ultrices dolor. Sed nisl metus, porta a justo in, condimentum posuere metus. Vivamus id nulla sit amet justo mollis tristique. In hac habitasse platea dictumst. Quisque at consectetur turpis. Aenean sit amet diam id metus volutpat venenatis. Nunc malesuada nisl fermentum dolor ornare, vel faucibus tortor porta. Mauris sagittis nunc et arcu vehicula hendrerit. Nulla facilisi. Nulla non tempor diam.
            </div>
            <div className={classes.postText}>
            Maecenas ullamcorper accumsan egestas. Donec vel rhoncus urna, non tempus nunc. Nunc mollis, sapien in aliquam luctus, lorem velit blandit nisi, ac lacinia ipsum orci et nisi. Duis sit amet turpis consequat diam condimentum eleifend. Etiam ex sapien, convallis sit amet vulputate in, pellentesque quis tortor. Suspendisse vel iaculis dolor. Maecenas vitae dolor dolor. In iaculis nunc non sapien dapibus, in blandit nunc cursus. Pellentesque rhoncus tortor egestas, hendrerit sem non, laoreet nulla. Suspendisse molestie dolor eu nisl tincidunt, sed auctor leo tincidunt. Ut non euismod ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus vel aliquet orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            </div>
            <div className={classes.postText}>
            Suspendisse porta venenatis eleifend. Vestibulum nec magna sed quam placerat lobortis. Vivamus consequat eget enim vitae tempus. Integer tempor turpis odio, et porta arcu laoreet quis. Duis ut eleifend purus. Praesent non mauris lobortis, placerat ipsum ut, porta magna. Mauris lacus tellus, pulvinar vitae commodo quis, egestas nec metus. Aenean id hendrerit nunc, nec dapibus massa. Vestibulum laoreet laoreet nunc dapibus varius. Quisque nulla nulla, efficitur id elit sed, ultrices suscipit enim. Pellentesque molestie convallis odio, eget euismod nibh bibendum quis.
            </div>
              </Typography>
            </Grid>
        </React.Fragment>
    )
}