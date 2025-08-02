require('dotenv').config();
const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Announce a message to this channel')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The message to announce')
        .setRequired(true)
    )
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log('Slash commands registered');
  } catch (error) {
    console.error(error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'announce') {
    const msg = interaction.options.getString('message');
    await interaction.reply({ content: `✅ Announcement sent!`, ephemeral: true });
    await interaction.channel.send(`📢 **Announcement:** ${msg}`);
  }
});

client.login(process.env.TOKEN);
