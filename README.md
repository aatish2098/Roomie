We were able to complete the login and registration pages with backend support by April 7th. We have prepared the html for pet registration but have not connected it to the back end yet. 

Note: (Jeremy) had a lot of issues downloading MySQL and logging into the database, so I was only able to get the server up and running today (April 7th). I plan to commit my required features by April 14th.

Initialise the database by making changes in the settings.py file and use the database name, username and password for your local MySQL server.

Commands to run:

1. To install the dependencies, run:

```
pip install -r requirements.txt
```
2. Use mysqldump to export your database to a SQL file. This file will contain the SQL commands to recreate the database structure and insert the data. Replace username and target_database with your local MySQL credentials and also update ``` settings.py ``` with your database name, username, password and port name.

```
mysql -u username -p target_database < path/to/roomie.sql
```
3. In your terminal, navigate to your project directory. Run the following commands to apply initial database migrations:
```
python manage.py migrate
```

4. To get the server up and running, run the following command:

```
python3 manage.py runserver
```
5. You should see a message indicating the server is running, and you can visit http://127.0.0.1:8000 in your web browser to see the default Django welcome page.

6. To save your database changes in mysql before commiting and pushing to git
```
.\mysqldump -u root -p roomie > roomie.sql    
```