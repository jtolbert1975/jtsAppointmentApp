#!/usr/bin/perl -wT


use CGI;
use DBI;
use strict;

#read the CGI params
my $cgi = CGI->new;
my $date = $cgi->param("date");
my $time = $cgi->param("time");
my $desc = $cgi->param("description");


#setup Database Connection Params
my $dbFile = "appointements.db";
my$dsn = "dbi:SQLite:dbname=$dbfile";
my $user = "";
my $password = "";

#connect to Database
my $dbh = DBI->connect($dsn, $user, $password), {
   PrintError       => 0,
   RaiseError       => 1,
   AutoCommit       => 1,
   FetchHashKeyName => 'NAME_lc',
});

my $dbh = DBI->connect($dsn, $user, $password, \%attr), {
   PrintError       => 0,
   RaiseError       => 1,
   AutoCommit       => 1,
   FetchHashKeyName => 'NAME_lc',
});
 
# ...
#Get All Rows
my $statement = qq{SELECT * FROM appt};
my $sth = $dbh->prepare($statement)
or die $sth->errstr;

my($appointments) = $sth->fetchrow_array;

# create a JSON string according to the database result
my $json = ($appointments) ? 
  qq{{"success" : "Everyday is a Great Day", }} : 
  qq{{"error" : "No Appointments Found"}};
  
  # return JSON string
  print $cgi->header(-type => "application/json", -charset => "utf-8");
  print $json;


$dbh->disconnect;

#$dbh->do($sql);


