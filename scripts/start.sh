
cd himadri-app

unzip himadri.zip

rm -rf himadri.zip

tmux new-session -d -s node-app 'npm start'