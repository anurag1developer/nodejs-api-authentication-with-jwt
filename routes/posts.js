const router = require("express").Router();
const verify = require("./verifyToken");
const Post = require("../model/Post");

// const posts = [
//   {
//     title: "What Is an NFT?",
//     description:
//       "An NFT is a digital asset that represents real-world objects like art, music, in-game items and videos. They are bought and sold online, frequently with cryptocurrency, and they are generally encoded with the same underlying software as many cryptos.",
//   },
//   {
//     title: "How Is an NFT Different from Cryptocurrency?",
//     description:
//       "NFT stands for non-fungible token. Its generally built using the same kind of programming as cryptocurrency, like Bitcoin or Ethereum, but thats where the similarity ends. Physical money and cryptocurrencies are “fungible,” meaning they can be traded or exchanged for one another. They’re also equal in value—one dollar is always worth another dollar; one Bitcoin is always equal to another Bitcoin. Cryptos fungibility makes it a trusted means of conducting transactions on the blockchain.",
//   },
//   {
//     title: "How Does an NFT Work?",
//     description:
//       "NFTs exist on a blockchain, which is a distributed public ledger that records transactions. You’re probably most familiar with blockchain as the underlying process that makes cryptocurrencies possible.",
//   },
// ];

router.get("/", verify, async (req, res) => {
  const posts = await Post.find({});
  res.json({ posts: posts });
  // res.json({
  //   posts: {
  //     title: "My first post",
  //     description: "random data you can not access if you are not logged in",
  //   },
  // });
});

router.post("/", verify, async (req, res) => {
  // const allPosts = await Post.insertMany(posts);
  try {
    const newPost = await new Post(req.body);
    // const user = await User.findById(req.body.userId);
    // if (!user) {
    //   return res.status(200).send
    // }
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
  // res.status(201).send(allPosts);
});

module.exports = router;
