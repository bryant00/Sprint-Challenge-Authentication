exports.seed = function(knex, Promise) {
  return knex("jokes")
    .truncate()
    .then(function() {
      return knex("jokes").insert([
        {
          joke:
            "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
        },
        {
          joke:
            "Did you hear about the guy whose whole left side was cut off? He's all right now."
        },
        {
          joke:
            "Why didn’t the skeleton cross the road? Because he had no guts."
        },
        {
          joke: "What did one nut say as he chased another nut?  I'm a cashew!"
        },
        {
          joke:
            "Chances are if you' ve seen one shopping center, you've seen a mall."
        },
        {
          joke:
            "I knew I shouldn't steal a mixer from work, but it was a whisk I was willing to take."
        },
        {
          joke:
            "How come the stadium got hot after the game? Because all of the fans left."
        }
      ]);
    });
};
