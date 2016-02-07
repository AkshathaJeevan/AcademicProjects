import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;



public class DonkeyCart extends JPanel {



 /**
  *
  */
 private static final long serialVersionUID = 1 L;
 int[][] polyx = new int[55][55];
 int[][] polyy = new int[55][55];
 static int countPoly = 0;
 int[] rectx = new int[55];
 int[] recty = new int[55];
 int[] rectWidth = new int[55];
 int[] rectHeight = new int[55];
 static int countRect = 0;



 int[] circlex = new int[55];

 int[] circley = new int[55];

 static int countCircle = 0;



 int[] arcx = new int[55];

 int[] arcy = new int[55];

 int[] arcWidth = new int[55];

 int[] arcHeight = new int[55];

 static int countArc = 0;



 static String url;

 static Statement stmt;

 static Connection con;

 int width = 700;

 int height = 1200;

 static int x = 20;

 static int y = 20;

 String query = null;

 float[] ia3;

 float[] ia4;

 boolean displayLabel = false;


 DonkeyCart() {

  init();

 }


 public static int[] scaleCoordinates(int[] point) {
  for (int i = 0; i < point.length; i++) {
   point[i] = (point[i]) * 700;
  }
  return point;
 }


 public void init() {


  JButton Theme = new JButton("Theme");

  JButton showAll = new JButton("Show All");




  JButton button1 = new JButton("Intersect");
  button1.addActionListener(new ActionListener() {
   @Override
   public void actionPerformed(ActionEvent actionEvent) {
    String query = "SELECT SDO_GEOM.SDO_INTERSECTION(c_a.shape, c_c.shape, 0.005) as shape from Donkey c_a, Donkey c_c where c_a.name = 'cola_a' AND c_c.name = 'cola_e'";

    try {
     float[] points = displayFunctionOperations(query);

     //OperationsFrame.showFram(scaleCoordinates(points));
    } catch (SQLException e) {
     System.out.println(e.toString());
    }

   }
  });

  JButton button2 = new JButton("Union");
  button2.addActionListener(new ActionListener() {
   @Override
   public void actionPerformed(ActionEvent actionEvent) {
    String query = "SELECT SDO_GEOM.SDO_UNION(c_a.shape, c_c.shape, 0.005) as shape from Donkey c_a, Donkey c_c where c_a.name = 'cola_a' AND c_c.name = 'cola_e'";
    try {
     float[] points = displayFunctionOperations(query);
     //OperationsFrame.showFram(scaleCoordinates(points));
    } catch (SQLException e) {
     // TODO Auto-generated catch block
     e.printStackTrace();
    }
   }
  });

  //Area

  JButton button3 = new JButton("Area");
  button3.addActionListener(new ActionListener() {
   @Override
   public void actionPerformed(ActionEvent actionEvent) {
    String query = "SELECT name,SDO_GEOM.SDO_AREA(shape, 0.005) as area FROM Donkey Cart WHERE NAME = 'cola_1'";
    ResultSet rs;
    try {
     rs = createConnection(query);
     if (rs != null) {
      while (rs.next()) {

       int s1 = rs.getInt("area");
       int area = s1;
       Object msg = "The area of Donkey Cart is " + (area * 700 / 50 * 700 / 50);

       JFrame f = new JFrame();
       f.setVisible(true);
       JOptionPane.showMessageDialog(f, msg);
      }
     }
    } catch (SQLException e) {
     // TODO Auto-generated catch block
     e.printStackTrace();
    }
   }
  });

  //Difference

  //panel.add(button4);
  JButton button4 = new JButton("Difference");
  button4.addActionListener(new ActionListener() {
   @Override
   public void actionPerformed(ActionEvent actionEvent) {
    String query = "SELECT SDO_GEOM.SDO_DIFFERENCE(c_b.shape,c_d.shape,0.0005) as shape FROM Donkey c_b, Donkey c_d WHERE c_b.name = 'cola_a' AND c_d.name = 'cola_e'";
    try {
     float[] points = displayFunctionOperations(query);
     //    OperationsFrame.showFram(scaleCoordinates(points));
    } catch (SQLException e) {
     // TODO Auto-generated catch block
     e.printStackTrace();
    }
   }
  });
  //AREA
  JButton area = new JButton("area");

  area.addActionListener(new ActionListener() {

   @Override

   public void actionPerformed(ActionEvent e) {
    query = "SELECT SDO_GEOM.SDO_AREA(shape, 0.005) FROM Donkey " +
     "WHERE name = 'behindwheel'";
    ResultSet rs = null;


    Float result = 0 f;
    try {

     rs = stmt.executeQuery(query); //create result object to hold   
     while (rs.next()) {
      result = rs.getFloat(1);
     }
    } catch (SQLException ee) {

     System.out.println("OOPS" + ee.getMessage());

    }

    displayArea(result);

   }

  });

  //Distance

  JButton button5 = new JButton("Distance");
  button5.addActionListener(new ActionListener() {
   @Override
   public void actionPerformed(ActionEvent actionEvent) {
    String query = "SELECT SDO_GEOM.SDO_DISTANCE(c_b.shape,c_d.shape,0.0005) as distance FROM Donkey c_b, Donkey c_d WHERE c_b.name = 'cola_a' AND c_d.name = 'cola_e'";
    ResultSet rs;
    try {
     rs = createConnection(query);
     rs.next();
     String s1 = rs.getString("distance");
     int area = Integer.parseInt(s1);
     Object msg = "The distance between Truck_Front_Part and Truck_Back_Part is " + (area);
     JFrame f = new JFrame();
     f.setVisible(true);
     JOptionPane.showMessageDialog(f, msg);
    } catch (SQLException e) {
     // TODO Auto-generated catch block
     e.printStackTrace();
    }
   }
  });

  //Centroid

  JButton button6 = new JButton("Length");
  button6.addActionListener(new ActionListener() {
   @Override
   public void actionPerformed(ActionEvent actionEvent) {
    String query = "SELECT SDO_GEOM.SDO_LENGTH(c.shape,m.diminfo) as length FROM Donkey c, user_sdo_geom_metadata m WHERE m.table_name = 'Donkey' AND m.column_name = 'SHAPE' and c.name ='cola_a'";
    ResultSet rs;
    try {
     rs = createConnection(query);
     rs.next();
     String len = rs.getString("length");
     int length = Integer.parseInt(len);
     Object msg = "The perimeter of Truck_Back_Part  is " + (length);
     JFrame f = new JFrame();
     f.setVisible(true);
     JOptionPane.showMessageDialog(f, msg);
    } catch (SQLException e) {
     // TODO Auto-generated catch block
     e.printStackTrace();
    }
   }
  });

  //
  JButton button7 = new JButton("Within Distance");
  button7.addActionListener(new ActionListener() {
   @Override
   public void actionPerformed(ActionEvent actionEvent) {
    String query = "SELECT SDO_GEOM.WITHIN_DISTANCE(c_b.shape, m.diminfo, 3,c_d.shape, m.diminfo) as WithInDistance FROM Donkey c_b, Donkey c_d, user_sdo_geom_metadata m  WHERE m.table_name = 'Donkey' AND m.column_name = 'SHAPE'  AND c_b.name = 'cola_b' AND c_d.name = 'cola_d'";
    ResultSet rs;
    try {
     rs = createConnection(query);
     rs.next();
     String withInDistance = rs.getString("WithInDistance");

     Object msg;
     if (withInDistance == "true") {
      msg = "Cart and Donkey distace is ";

     } else {
      msg = "Cart and Donkey distace isCart and Donkey distace is ";

     }

     JFrame f = new JFrame();
     f.setVisible(true);
     JOptionPane.showMessageDialog(f, msg);
    } catch (SQLException e) {
     // TODO Auto-generated catch block
     e.printStackTrace();
    }
   }
  });

  //Touch
  JButton button8 = new JButton("Relate");
  button8.addActionListener(new ActionListener() {
   @Override
   public void actionPerformed(ActionEvent actionEvent) {
    String query = "SELECT c.name FROM Donkey c,Donkey d WHERE d.name = 'larc1' AND c.name <> 'larc2' AND SDO_RELATE(c.shape,d.shape,'mask=TOUCH') = 'TRUE'";
    ResultSet rs;
    try {
     rs = createConnection(query);
     rs.next();
     String s1 = rs.getString("name");
     Object msg = "The Wing Of Bird Touches its Other Wing";
     JFrame f = new JFrame();
     f.setVisible(true);
     JOptionPane.showMessageDialog(f, msg);
    } catch (SQLException e) {
     // TODO Auto-generated catch block
     e.printStackTrace();
    }
   }
  });



  //XOR



  //Insert
  JButton insert = new JButton("insert");
  insert.addActionListener(new ActionListener() {

   @Override

   public void actionPerformed(ActionEvent e) {
    int count = 0;
    query = "INSERT INTO Donkey VALUES (53,'cola_0'," +
     "MDSYS.SDO_GEOMETRY(2002,null,null,MDSYS.SDO_ELEM_INFO_ARRAY(1,1003,1)," +
     //"MDSYS.SDO_ORDINATE_ARRAY(15,25)))";
     "MDSYS.SDO_ORDINATE_ARRAY(13,19.5,16,25.5,13,19.5)))";

    //g.drawArc(arcx[count] ,arcy[count], 125, 125, 240, 25);
    System.out.println("insert");
    //"MDSYS.SDO_ORDINATE_ARRAY(13,19.5,16,25.5,16,19.5,13,19.5)))";
    createConnection();

    try {

     stmt.executeUpdate(query); //create result object to hold   

    } catch (SQLException ee) {

     System.out.println("OOPS" + ee.getMessage());

    }
    query = "SELECT * from Donkey ";
    display(4);


   }

  });

  //Update

  JButton update = new JButton("update");
  update.addActionListener(new ActionListener() {
   @Override
   public void actionPerformed(ActionEvent e) {
    query = "update Donkey set shape=MDSYS.SDO_GEOMETRY(2502,null,null,MDSYS.SDO_ELEM_INFO_ARRAY(1,1003,3),MDSYS.SDO_ORDINATE_ARRAY(16,17,24,29))" + "where mkt_id=1";
    System.out.println("update");
    createConnection();
    try {
     stmt.executeUpdate(query);

    } catch (SQLException ee) {
     System.out.println("oops" + ee.getMessage());
    }
    query = "select * from Donkey";
    display(3);
   }
  });


  JButton reset = new JButton("reset");
  update.addActionListener(new ActionListener() {
   @Override
   public void actionPerformed(ActionEvent e) {
    query = "update Donkey set shape=MDSYS.SDO_GEOMETRY(2502,null,null,MDSYS.SDO_ELEM_INFO_ARRAY(16,17,24,21))" + "where mkt_id=1";
    createConnection();
    try {
     stmt.executeUpdate(query);

    } catch (SQLException ee) {
     System.out.println("oops" + ee.getMessage());
    }
    query = "select * from Donkey";
    display(3);
   }
  });
  //panel.add(button1);

  JButton delete = new JButton("Delete");

  //JButton addCircle2 = new JButton("Add Circle2");



  delete.addActionListener(new ActionListener() {

   @Override

   public void actionPerformed(ActionEvent e) {
    query = "delete from Donkey where mkt_id=53";
    createConnection();

    try {

     stmt.executeUpdate(query); //create result object to hold   

    } catch (SQLException ee) {

     System.out.println("OOPS" + ee.getMessage());

    }
    query = "SELECT * from Donkey";
    display(4);


   }

  });

  /*addCircle2.addActionListener(new ActionListener() {

      @Override

      public void actionPerformed(ActionEvent e) {

          query = "INSERT INTO Donkeys VALUES (7,'cola_d',MDSYS.SDO_GEOMETRY (2503,NULL,NULL,MDSYS.SDO_ELEM_INFO_ARRAY(1,1003,3), " +

                  "MDSYS.SDO_ORDINATE_ARRAY(13,19.5,16,19.5)))";

          display();   

      }

  });*/



  showAll.addActionListener(new ActionListener() {

   @Override

   public void actionPerformed(ActionEvent e) {

    query = "select * FROM Donkey";

    display(3);

   }

  });






  this.add(showAll, BorderLayout.NORTH);




  this.add(button1, BorderLayout.NORTH);
  this.add(button2, BorderLayout.NORTH);
  this.add(button3, BorderLayout.NORTH);
  this.add(button4, BorderLayout.NORTH);
  this.add(button5, BorderLayout.NORTH);
  this.add(button6, BorderLayout.NORTH);
  this.add(button7, BorderLayout.NORTH);
  this.add(button8, BorderLayout.NORTH);

  this.add(insert, BorderLayout.NORTH);
  this.add(delete, BorderLayout.NORTH);

  //this.add(update, BorderLayout.NORTH);
  //this.add(reset, BorderLayout.NORTH);
  //this.add(addCircle2, BorderLayout.NORTH);

 }

 private void displayArea(Float area) {

  JOptionPane.showMessageDialog(this, "The area of the wheel is : " + area);

 }



 protected int[] connection(String query2) {
  // TODO Auto-generated method stubon5
  return null;
 }



 public void DrawPolygon(int[] x, int[] y) {

  this.polyx[countPoly] = x;

  this.polyy[countPoly] = y;

  countPoly++;
  System.out.println("polygon " + polyx);

 }



 public void DrawArc(int[] x, int[] y) {

  this.arcx[countArc] = x[0] - 1;

  this.arcy[countArc] = y[0];

  countArc++;

 }



 public void DrawRectangle(int[] x, int[] y) {

  this.rectWidth[countRect] = Math.abs((x[1] - x[0]));

  this.rectHeight[countRect] = Math.abs((y[1] - y[0]));

  this.rectx[countRect] = x[0];

  this.recty[countRect] = y[1];

  countRect++;

 }



 public void DrawCircle(int[] x, int[] y) {

  this.circlex[countCircle] = x[0] - 1;

  this.circley[countCircle] = y[1];

  countCircle++;
  System.out.println("Circle Values" + x[0] + "," + y[1]);

 }



 public void paintComponent(Graphics g) {



  super.paintComponent(g);

  g.setFont(new Font("Arial Black", Font.BOLD, 16));

  g.drawString("Donkey Cart", 400, 80);

  for (int count = 0; count < countPoly; count++) {

   if (ia3[1] == 1003) {
    g.drawPolygon(polyx[count], polyy[count], polyx[count].length);
   }

   if (ia3[1] == 2) {

    g.drawPolyline(polyx[count], polyy[count], polyx[count].length);
   }

  }





  for (int count = 0; count < countRect; count++) {

   g.drawRect(rectx[count], recty[count] - 40, rectWidth[count], rectHeight[count]);


   if (count == 0 && (!displayLabel)) {
    displayLabel = true;

    JLabel label = new JLabel();
    label.setBounds(rectx[count] + 100, recty[count], rectWidth[count], rectHeight[count]);


    label.setFont(new Font("Papyrus", Font.ROMAN_BASELINE, 15));


    label.setVisible(displayLabel);

    this.add(label);

   }



  }



  for (int count = 0; count < countCircle; count++) {

   //wheel
   if (count == 0) {

    g.drawOval(circlex[count] - 50, circley[count] - 40, 50, 50);
   }
   //donkey eye
   if (count == 1) {
    g.drawOval(circlex[count], circley[count] - 35, 5, 5);
   }
  }



  for (int count = 0; count < countArc; count++) {

   if (count == 0) {
    g.drawArc(arcx[count], arcy[count] - 10, 30, 30, 70, 90);
   }

   if (count == 1) {
    g.drawArc(arcx[count] - 13, arcy[count] + 7, 175, 10, 60, 120);
   }

   if (count == 2) {
    g.drawArc(arcx[count] - 10, arcy[count] - 20, 25, 40, 250, 150);
   }

   if (count == 3) {
    g.drawArc(arcx[count] - 10, arcy[count], 25, 80, 260, 200);
   }

   if (count == 4) {
    g.drawArc(arcx[count] - 22, arcy[count] + 12, 20, 25, 160, 230);
   }


   if (count == 5) {
    g.drawArc(arcx[count] - 26, arcy[count] - 30, 10, 15, 100, 220);
   }

   if (count == 6) {
    g.drawArc(arcx[count] - 18, arcy[count] - 15, 20, 20, 60, 90);
   }

   if (count == 7) {
    g.drawArc(arcx[count] - 20, arcy[count] + 81, 10, 15, 90, 200);
   }


   if (count == 8) {
    g.drawArc(arcx[count] - 7, arcy[count] + 15, 20, 10, 300, 150);
   }

   if (count == 9) {
    g.drawArc(arcx[count] - 110, arcy[count] - 60, 90, 20, 175, 190);
   }


   if (count == 10) {
    g.drawArc(arcx[count] - 105, arcy[count] - 5, 20, 40, 278, 130);
   }


   if (count == 11) {
    g.drawArc(arcx[count] + 3, arcy[count] + 55, 10, 15, 104, 240);
   }

   if (count == 12) {
    g.drawArc(arcx[count] - 4, arcy[count] + 10, 20, 14, 300, 125);
   }


   if (count == 13) {
    g.drawArc(arcx[count] - 56, arcy[count] - 80, 20, 50, 278, 150);
   }

   if (count == 14) {
    g.drawArc(arcx[count] - 70, arcy[count] - 450, 80, 250, 60, 60);
   }
   if (count == 15) {
    g.drawArc(arcx[count] + 10, arcy[count] - 30, 80, 250, 60, 60);
   }

   if (count == 16) {
    g.drawArc(arcx[count] + 18, arcy[count] - 30, 80, 250, 60, 60);
   }

   if (count == 17) {
    g.drawArc(arcx[count] + 10, arcy[count] - 30, 80, 250, 60, 60);
   }

   if (count == 18) {
    g.drawArc(arcx[count] - 64, arcy[count] - 30, 85, 270, 60, 60);
   }

   if (count == 19) {
    g.drawArc(arcx[count] - 18, arcy[count] - 7, 80, 50, 120, 120);
   }

   if (count == 20) {
    g.drawArc(arcx[count] - 17, arcy[count] + 35, 82, 50, 120, 122);
   }

   if (count == 21) {
    g.drawArc(arcx[count] + 27, arcy[count] - 45, 35, 45, 250, 210);
   }

   if (count == 22) {
    g.drawArc(arcx[count] - 15, arcy[count] + 37, 37, 45, 240, 210);
   }

   if (count == 23) {
    g.drawArc(arcx[count] - 115, arcy[count] + 247, 10, 15, 80, 220);
   }

   if (count == 23) {
    g.drawArc(arcx[count] - 115, arcy[count] + 260, 10, 15, 200, 220);
   }

  }




 }



 private void createConnection() {
  url = "jdbc:oracle:thin:@localhost:1521:XE";

  try {

   Class.forName("oracle.jdbc.driver.OracleDriver").newInstance();

  } catch (Exception e) {

   System.out.println(" MR.UnitSitQueries.constructor.Exception : " + e);

  }

  try {

   con = DriverManager.getConnection(url, "scott", "tiger");

   //establish connection to DBMS or database

   stmt = con.createStatement();

  } catch (SQLException e) {
   System.out.println("OOPS" + e.getMessage());
  }

 }



 public DonkeyCart display(int shape) {

  //        MainClass panel = new MainClass();

  this.createConnection();



  if (query == null) {

   query = "select * FROM Donkey";

  }

  ResultSet rs = null;



  try {

   rs = stmt.executeQuery(query); //create result object to hold   

  } catch (SQLException e) {

   System.out.println("OOPS" + e.getMessage());

  }



  this.handleResultSet(rs);

  //        panel.repaint();

  this.repaint();

  return this;

 }





 public static void main(String args[]) {



  JFrame frame = new JFrame("Oval Sample");

  frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

  //frame.setLayout(new BorderLayout());



  DonkeyCart panel = new DonkeyCart();

  panel = panel.display(3);



  frame.add(panel);
  //frame.add(panel, BorderLayout.CENTER);
  //frame.add(panel, BorderLayout.EAST);


  //window size
  frame.setSize(1000, 1000);

  frame.setVisible(true);

 }



 private void clearShapeData() {

  polyx = new int[55][55];

  polyy = new int[55][55];

  countPoly = 0;



  rectx = new int[45];

  recty = new int[45];

  rectWidth = new int[45];

  rectHeight = new int[45];

  countRect = 0;



  circlex = new int[55];

  circley = new int[55];

  countCircle = 0;



  arcx = new int[55];

  arcy = new int[55];

  arcWidth = new int[55];

  arcHeight = new int[55];

  countArc = 0;

 }



 public void handleResultSet(ResultSet rs) {

  this.clearShapeData();



  try {

   while (rs.next()) {

    java.sql.Struct o1 = (java.sql.Struct) rs.getObject("shape");
    oracle.sql.ARRAY oa3 = (oracle.sql.ARRAY) o1.getAttributes()[3];


    oracle.sql.ARRAY oa4 = (oracle.sql.ARRAY) o1.getAttributes()[4];

    ia3 = oa3.getFloatArray();


    ia4 = oa4.getFloatArray();



    int j = 0;

    int[] xCoordinates = new int[(ia4.length) / 2];

    int[] yCoordinates = new int[(ia4.length) / 2];



    int CountX = 0;

    int CountY = 0;

    for (j = 0; j < ia4.length; j = j + 2)

    {

     //xCoordinates[CountX] = ia4[j]*40;

     xCoordinates[CountX] = (int)(ia4[j] * 30);

     System.out.println("x co- " + xCoordinates[CountX]);

     CountX++;

    }

    for (j = 1; j < ia4.length; j = j + 2)

    {

     //yCoordinates[CountY] = height - ia4[j]*40;


     yCoordinates[CountY] = (int)(height - ia4[j] * 40);

     if (ia3[1] == 2) {
      yCoordinates[CountY] = yCoordinates[CountY] - 40;
     }

     System.out.println("Y co--" + yCoordinates[CountY]);


     CountY++;

    }

    if (ia3[2] == 1)

    {

     DrawPolygon(xCoordinates, yCoordinates);

    } else if (ia3[2] == 2)

    {

     DrawArc(xCoordinates, yCoordinates);
    } else if (ia3[2] == 3)

    {

     DrawRectangle(xCoordinates, yCoordinates);



    } else if (ia3[2] == 4)

    {


     DrawCircle(xCoordinates, yCoordinates);



    }

   }

  } catch (SQLException e) {

   System.out.println("OOPS" + e.getMessage());

  }

 }


 public float[] displayFunctionOperations(String query) throws SQLException {

  //intersection
  this.createConnection();



  //if (query == null){

  //query = "select * FROM Donkey";   

  //}

  ResultSet rs = null;




  rs = stmt.executeQuery(query); //create result object to hold   

  rs.next();

  java.sql.Struct o1 = (java.sql.Struct) rs.getObject("shape");

  oracle.sql.ARRAY oa3 = (oracle.sql.ARRAY) o1.getAttributes()[3];

  oracle.sql.ARRAY oa4 = (oracle.sql.ARRAY) o1.getAttributes()[4];

  ia4 = oa4.getFloatArray();

  return ia4;

 }


 private ResultSet createConnection(String query) throws SQLException {
  this.createConnection();
  ResultSet rs = null;
  rs = stmt.executeQuery(query); //create result object to hold   

  return rs;


 }



}