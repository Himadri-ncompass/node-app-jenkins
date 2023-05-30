project_path="himadri-app"
session_name="node-app"

cd $project_path
 if [ $? -eq 0 ]
 then
   sudo tmux kill-session -t $session_name
   
 fi
rm -rf /home/ubuntu/himadri-app
                                                     

                                    