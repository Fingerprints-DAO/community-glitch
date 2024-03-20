#!/bin/bash

curl -L https://foundry.paradigm.xyz | bash
source $HOME/.foundry/bin/foundryup
export PATH="$HOME/.foundry/bin:$PATH"
ls -l $HOME/.foundry/bin
