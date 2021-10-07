# This file contains ZSH configuration for your shell when you interact with a container
# (we wouldn't want any boring `sh` now would we?)
# Please feel free to set up your own ZSH config in here!
# It gets mapped to your `.zshrc` for the root user in the container

# Source Antigen
source ~/.antigen/antigen.zsh
autoload -U colors && colors
setopt promptsubst
# Set up oh-my-zsh
antigen use oh-my-zsh
# Set up plugins
antigen bundle git
antigen bundle docker

# Syntax highlighting bundle.
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-autosuggestions
antigen bundle history-substring-search

# Set up our preferred theme
antigen theme robbyrussell
# antigen theme cloud

# Run all that config
antigen apply

# Set up Ctrl + Backspace and Ctrl + Del so you can move around and backspace faster (try it!)
bindkey '^H' backward-kill-word
bindkey -M emacs '^[[3;5~' kill-word
bindkey '^C' screen-detach

# Set up aliases
alias cl="clear"
alias x="exit"

eval "$(starship init zsh)"