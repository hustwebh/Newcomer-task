#include <stdio.h>
#include <stdlib.h>
#include <bits/stdc++.h>

using namespace std;

//typedef BinTree Position;
typedef struct TreeNode
{ //定义链式结构二叉树数据类型
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
} * BinTree;

//------------树的先中后遍历函数（递归）-----------------------
void Traverse(BinTree BT)
{
    if (BT)
    {
        printf("%c  ", BT->data); //1
        Traverse(BT->left);       //2
        Traverse(BT->right);      //3
    }
}
/*     
       *此时顺序为123,为先序遍历过程           先根节点再左右
       * 若要实现中序遍历，则语句顺序调整为213   先左再根节点后右
       * 若要实现后序遍历，则语句顺序调整为231   先左后右再根节点
*/

//---------树的先中后遍历函数（非递归，堆栈实现）----------------
void _Traverse(BinTree BT)
{
    BinTree T = BT;
    stack<BinTree> S;
    while (T || !S.empty())
    {
        if (T)
        {
            S.push(T);
            //将4句放在此处即为先序遍历
            T = T->left;
        }
        else
        {
            T = S.top();
            printf("%c  ", T->data); //4该句放在此处为中序遍历
            S.pop();
            T = T->right;
        }
    }
}

//------------------树的层级遍历（队列）-----------------------
void LevalTraverse(BinTree BT)
{
    queue<BinTree> Q;
    if (!BT)
        return;
    Q.push(BT);
    while (!Q.empty())
    {
        BT = Q.front();
        printf("%c  ", BT->data);
        Q.pop();
        if (BT->left)
            Q.push(BT->left);
        if (BT->right)
            Q.push(BT->right);
    }
}

//-------------------建立二叉树---------------------------
//---初始化二叉树---
int InitTree(BinTree *T)
{
    *T = NULL;
    return 1;
}
//---向其中填入数据---
void CreateBinTree(BinTree *T)
{
    char ch;
    scanf("%c", &ch);
    if (ch == '#') //#代表这个节点没有子树。
        *T = NULL;
    else
    {
        *T = (BinTree)malloc(sizeof(struct TreeNode));
        //if(!*T) exit(-1);
        (*T)->data = ch;             /* 生成根结点 */
        CreateBinTree(&(*T)->left);  /* 构造左子树 */
        CreateBinTree(&(*T)->right); /* 构造右子树 */
    }
}

int main()
{
    BinTree T;
    InitTree(&T);
    CreateBinTree(&T);
    //Traverse(T);
    _Traverse(T);
    //LevalTraverse(T);
    return 1;
}