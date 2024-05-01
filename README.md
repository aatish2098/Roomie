We implemented the following features for the project:

**Basic Features**

1. Login & Registration with User Session Handle -- fh818
2. Search Certain Apartment Units -- jwf295
3. Register Pet -- fh818
4. Post and View Interests -- ab10047
5. Display Unit and Building Info -- fh818


**Additional Features**

6. Advanced Search of Units -- jwf295
7. Search Interest -- ab10047
8. Estimate Monthly Rent -- ab10047
9. Favourite -- fh818
10. Extra View on the Rent Price -- ab10047
11. Comment System -- jwf295


**Application Related Features**

12. Sessions -- fh818
13. Necessary Security Mechanism -- ab10047



**Commands to run:**

1. To install the dependencies, open two separate terminals (one in the "backend" directory and the other in the "frontend" directory):

In the backend terminal run:
```
pip install -r requirements.txt
```
In the frontend terminal run:
```
npm install
```

2. Use mysqldump to export your database to a SQL file. This file will contain the SQL commands to recreate the database structure and insert the data. Replace username and target_database with your local MySQL credentials and also update ``` .env``` with your database name, username, password and port name.

```
mysql -u username -p target_database < path/to/roomie.sql
```
OR (for Windows)
```
Get-Content roomie.sql | ./mysql -u root -p roomie
```
3. In your terminal, navigate to your project directory. Run the following commands to apply initial database migrations:

```
python manage.py makemigrations
```
```
python manage.py migrate
```

4. To get the server/client up and running, run the following command:

In the backend terminal:
```
python3 manage.py runserver
```

In the frontend terminal:
```
npm start
```
5. You should see a message indicating the server is running, and you can visit http://127.0.0.1:8000 in your web browser to see the default Django welcome page.

6. To save your database changes in mysql before commiting and pushing to git
```
.\mysqldump -u username -p target_database > roomie.sql    
```