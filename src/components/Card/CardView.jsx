import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { ContextData } from "../../App";
import { db, storage } from "../../Firebase";
import "./Card.css";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));
export default function CardView({ item }) {
  const { setCurrentOpen, setRun } = useContext(ContextData);
 const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);


  const [favo, setFavo] = useState(false);
  const [mainImg, setMainImg] = useState([]);

  const open = () => {
    setCurrentOpen(item);
    setRun(true);
  };

  function favoriteRecipe() {
    const docref = doc(db, "recepis", item.docId);
    setDoc(docref, { ...item, favorite: !favo });
    setFavo(!favo);
  }
  useEffect(() => {
    setFavo(item.favorite);
    setMainImg([]);

    if (item != null) {
      const imagesListRef = ref(
        storage,
        `${item.docId == null ? "" : item.docId}`
      );
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setMainImg((mainImg) => [...mainImg, url]);
          });
        });
      });
    }
  }, [item]);

  return (
    <>
      {/* <div
        className="card text-dark cardHover mb-2 imgScale p-0"
        style={{ height: "100px" }}
      >
        <div className="imgScale">
          <img
            className=" imgStyle"
            height={"100%"}
            width={"100%"}
            src={
              mainImg[0]
                ? mainImg[0]
                : "https://i.imagesup.co/images2/4c7cc05dd420f94ff35456056d5a114499bbbb62.jpg"
            }
            alt="card"
          />
        </div>
        <div className="card-img-overlay d-flex">
          <div
            className="col-4 pl-0 pr-0 d-flex justify-content-start align-items-end"
            onClick={favoriteRecipe}
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqrgkqvs.json"
              trigger="hover"
              colors={
                favo
                  ? "primary:#e83a30,secondary:#000000"
                  : "primary:#242424,secondary:#fad3d1"
              }
              style={{ width: "43px", height: "43px" }}
            ></lord-icon>
          </div>
          <h4
            onClick={() => {
              open();
              window.scrollTo(0, 0);
              console.log("click12");
            }}
            className="d-flex justify-content-end col-8 pl-0 pr-0 align-items-center textCard"
          >
            {item.name.charAt(0).toLowerCase() > "a" &&
            item.name.charAt(0).toLowerCase() < "z"
              ? item.name.length < 10
                ? item.name
                : item.name.slice(0, 10) + "..."
              : item.name.length < 10
              ? item.name
              : "..." + item.name.slice(0, 10)}
          </h4>
        </div>
      </div> */}
      <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </>
  );
}}
