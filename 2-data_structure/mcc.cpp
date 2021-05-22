#include <stdio.h>
#include <stdlib.h>
#include <bits/stdc++.h>

using namespace std;

#define N 100

int node[N]; //每个节点

//初始化n个节点
void Init(int n)
{
    for (int i = 0; i < n; i++)
    {
        node[i] = i;
    }
}

//查找当前元素所在树的根节点
int Find(int x)
{
    if (x == node[x])
        return x;
    return Find(node[x]);
}

//合并元素x， y所处的集合
void Merge(int x, int y)
{
    //查找到x，y的根节点
    x = Find(x);
    y = Find(y);
    if (x == y)
        return;
    //将x的根节点与y的根节点相连
    node[x] = y;
}

//判断x，y是属于同一个集合
bool Is_same(int x, int y)
{
    return Find(x) == Find(y);
}


void main()
{

}