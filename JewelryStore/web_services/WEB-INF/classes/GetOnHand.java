import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import sdsu.*;
import helpers.*;

public class GetOnHand extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    HttpSession session = request.getSession(false);
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();

    String sku = request.getParameter("sku");
    Vector<String []> answer = DBHelper.doQuery("SELECT  * FROM on_hand ");

    String finalString="";
    for(int i=0; i < answer.size(); i++) 
    {
        String [] tmp = answer.elementAt(i);
        for(int j=0; j < tmp.length; j++)
                finalString = finalString + tmp[j] + "|";
        finalString = finalString + ";";
    }
        
    response.getWriter().write(finalString);

    }

    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
        doGet(request, response);
    }
}
