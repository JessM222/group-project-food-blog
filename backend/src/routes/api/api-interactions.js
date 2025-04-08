import express from "express";
import { 
    getInteractionsByArticle,
    getInteractionsByUser,
    addInteraction,
    deleteInteraction  
  } from "../../data/interactions-dao.js";
  
import { requiresAuthentication } from "../../middleware/auth-middleware.js";

const router = express.Router();


router.get("/byarticle/:articleId", async (req, res) => { //getInteractionsByArticle
  const { articleId } = req.params;  
  try {
    const interactions = await getInteractionsByArticle(articleId);
    return res.status(200).status(interactions.length === 0 ? 204 : 200).json({ interactions });
  } catch (error) {
    return res.sendStatus(422);
  }  
});

router.get("/byuser", requiresAuthentication, async (req, res) => { //getInteractionsByUser  
  try {        
      const interactions = await getInteractionsByUser(req.user.username);
      return res.status(interactions.length === 0 ? 204 : 200).json({ interactions });
    } catch {
      return res.sendStatus(422);
    }
});

router.post("/:articleId", requiresAuthentication, async (req, res) => {  //addInteraction  (LIKE or BOOKMARK)  
  const { articleId } = req.params;
  const { type } = req.body;
  try {
      const result = await addInteraction(articleId, type, req.user.username);
      return res.status(200).json({
        message: "Interaction toggled",
        count: result.count,
        toggled: result.toggled
      });
    } catch (error) {
      console.error(error);
      return res.sendStatus(422);
    }
  });

router.delete("/:interactionId", async (req, res) => {
  const { interactionId } = req.params;
  await deleteInteraction(interactionId);
  return res.status(200).json({ message: `Interaction with ID ${interactionId} has been deleted` });
});

export default router;