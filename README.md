# Superhero battle react

Superheroes and villains are always battling it out, but how do we know who wins? In this test we will create a single page application to find out.

The superhero and villain characters along with their stats are stored in a public json file stored in AWS S3 - https://s3.eu-west-2.amazonaws.com/build-circle/characters.json

During a battle the character with the highest score wins.

We expect the solution to be simple, readable, and to be supported by good unit tests (reliable, fast, and asserting behaviour).


## 1. Run the tests

```
yarn test
```

## 2. Check the code

Familiarise yourself with the code. What does it all do? What do the tests do?

## 3. Hero and villain name input

We need a way of taking in a hero name and a villain name as inputs, and a battle button to trigger the fight!

## 4. Triggering the battle

When the battle button is clicked, we need to load the characters JSON file and find the characters by their name. We can then compare the scores of each character, the winner has the higher score. We should show the winner on the page after the battle is over.

## 5. Weaknesses

Each hero usually has a nemesis. This is captured in the weakness field in the JSON. If a hero is fighting a villain that matches the villain in their weakness field their score is weakened by 1 point. Lets write some code to handle this.
