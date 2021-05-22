#include<stdio.h>
#include<stdlib.h>

void main ()
{
    char *str="HalloWorld";//若动态输入就自己改，scanf（“%s”，str）这么一套走下去
    char *start=*str;   //指向开头的指针
    char *end=*start;   //指向字符串结尾的指针
    while (*end)   //while的作用是将尾部指针指向字符串尾部
        end++;
    end--;
    char *temp;
    while(start-end<0)
    {
        *temp = *start;
        *start = *end;
        *end = *temp;

        start ++;
        end --;
    }
    //输出
}