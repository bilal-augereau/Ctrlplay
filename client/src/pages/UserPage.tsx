import "./UserPage.css";

import poule from "../assets/images/avatar/avatarpoule.png";

function UserPage() {
	/* fake user */
	const user = {
		pseudo: "Necnec",
		avatar: "poule",
		favorites: [
			{
				id: 6,
				title: "Life is Strange",
				year: 2015,
				description:
					"<p>Interactive storytelling and plot-heavy games gained popularity, and “Life is Strange” arrived as teen mystery adventure. The plot will go through the life of Maxine, a teenager in possession of curious power, allowing her to stop and rewind time, in order to manipulate her surroundings. Max, after the reunion with her friend Chloe, is on the path to uncovering the secrets of Arcadia Bay. Players will have to deal with puzzle solving through the fetch quests, in order to change the world around them. <br />\nThe game puts players in situations, where they’re forced to make a moral choice, going through the decision which may have short-term or long-term consequences. Every choice made by the player will trigger the butterfly effect, surrounding the first playthrough of the game with a lot of emotional struggle, thoughtfully crafted by the developers at Dontnod Entertainment. Life is Strange is third person adventure game, where players might seem just as an observer of the stories, unfolding in front of them.</p>",
				image:
					"https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg",
				image_2:
					"https://media.rawg.io/media/screenshots/8e9/8e910792acf05dd5721f461744b04090.jpg",
				note: 4.12,
				website: "https://www.lifeisstrange.com/en-us/games/life-is-strange",
				user_id: 5,
				game_id: 6,
				finished: 1,
				time_spent: 0,
				favorite: 1,
				to_do: 0,
			},
			{
				id: 33,
				title: "Stardew Valley",
				year: 2016,
				description:
					"<p>The hero (in the beginning you can choose gender, name and appearance) - an office worker who inherited an abandoned farm. The landscape of the farm can also be selected. For example, you can decide whether there will be a river nearby for fishing.<br />\nThe farm area needs to be cleared, and it will take time.<br />\nThe hero has many different activities: plant and care for plants, raise livestock, practice crafts, extract ore, and also enter into relationships with residents of the neighbouring town to earn game money. Relationships with characters include communication, performing tasks for money, exchanging, searching for fossils and even military actions and marrying. The character is limited by the reserve of strength and health - both parameters are visible on the screen, and the game automatically puts the hero to rest if the limit of his capabilities is close. The game does not set any ultimate or primary goal, its many possibilities are designed for an unlimited time.</p>",
				image:
					"https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg",
				image_2:
					"https://media.rawg.io/media/screenshots/62b/62b36b00ffc3052880176fa9d20f2741.jpg",
				note: 4.4,
				website: "http://www.stardewvalley.net",
				user_id: 5,
				game_id: 33,
				finished: 1,
				time_spent: 0,
				favorite: 1,
				to_do: 0,
			},
			{
				id: 78,
				title: "Slay the Spire",
				year: 2019,
				description:
					"<p>We fused card games and roguelikes together to make the best single player deckbuilder we could. Craft a unique deck, encounter bizarre creatures, discover relics of immense power, and Slay the Spire!</p>\n<p>Features:</p>\n<ul>\n<li>Dynamic Deck Building: Choose your cards wisely! Discover hundreds of cards to add to your deck with each attempt at climbing the Spire. Select cards that work together to efficiently dispatch foes and reach the top.   </li>\n<li>An Ever-changing Spire: Whenever you embark on a journey up the Spire, the layout differs each time.   </li>\n<li>Choose a risky or safe path, face different enemies, choose different cards, discover different relics, and even fight different bosses!  </li>\n<li>Powerful Relics to Discover: Powerful items known as relics can be found throughout the Spire. The effects of these relics can greatly enhance your deck through powerful interactions. But beware, obtaining a relic may cost you more than just gold...</li>\n</ul>",
				image:
					"https://media.rawg.io/media/games/f52/f5206d55f918edf8ee07803101106fa6.jpg",
				image_2:
					"https://media.rawg.io/media/screenshots/595/59591d947b03e28d88219c9a1d589116.jpg",
				note: 4.37,
				website: "https://www.megacrit.com/",
				user_id: 5,
				game_id: 78,
				finished: 0,
				time_spent: 0,
				favorite: 1,
				to_do: 1,
			},
			{
				id: 70,
				title: "Armello",
				year: 2015,
				description:
					"<p>Armello is a digital role-playing tabletop game developed by an indie Australian studios League of Geeks. It is the debut project of the game.</p>\n<h3>Plot</h3>\n<p>The game is set in a “dark fairytale” kingdom of Armello, where the anthropomorphic animals from many clans live. The king has gone crazy and is slowly dying because of the dark force named the Rot. The representatives of several factions come to the kingdom&#39;s capital to become the new king. Four characters are present at the beginning of the game: Tane the wolf, Amber the rabbit, Mercurio the rat, and Sanah, the bear. </p>\n<h3>Gameplay</h3>\n<p>Armello is a digital remake of a traditional fantasy tabletop role-playing game in which there are rolling dice and cards, that allows the players to execute certain actions. The gaming area is divided into hexagonal plates, that contain procedurally generated features like caves, buildings, other characters or pieces of equipment. As the game progresses, the players can buy in-game currency to purchase special abilities using the skill tree, that is unique to every character.</p>\n<p>The game uses a turn-based system, where the players can equip new items or acquire new skills while the other players make their turn. The cards and dice are used only when the players directly interact with the in-game world. The players use cards for casting spells, hiring teammates, treating wounds or using the special items that grant temporary abilities.</p>",
				image:
					"https://media.rawg.io/media/games/3d2/3d260e4aaeb88b7ac53c81040ac4b80c.jpg",
				image_2:
					"https://media.rawg.io/media/screenshots/f44/f44588ffbe0fdf4258d090ae1e31923b.jpg",
				note: 3.59,
				website: "http://www.armello.com",
				user_id: 5,
				game_id: 70,
				finished: 1,
				time_spent: 0,
				favorite: 1,
				to_do: 1,
			},
		],
	};
	/* end fake user */

	const avatarsURL = {
		poule: poule,
	};

	return (
		<main id="user-main">
			<aside id="user-aside">
				<section className="content-box user-box">
					<img src={avatarsURL.poule} alt={user.avatar} />
					<h1>Welcome {user.pseudo}</h1>
				</section>
				<section className="content-box user-box">
					<h3>Game of the week</h3>
				</section>
			</aside>
		</main>
	);
}

export default UserPage;
