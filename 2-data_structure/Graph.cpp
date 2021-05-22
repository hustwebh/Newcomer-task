#include <stdio.h>
#include <stdlib.h>
#include <bits/stdc++.h>

using namespace std;

#define MAX 100		   //数组大小
int visited[MAX];	   //访问标志数组
typedef int QElemType; //队列数据类型
typedef int ElemType;  //顶点数据类型

//边表
typedef struct NODE
{
	int adjvex;		   //顶点下标
	int weight;		   //权值
	struct NODE *next; //指向下一个结点
} EdgeNode;

//顶点表
typedef struct
{
	char name;
	ElemType vertex;	//顶点的值
	EdgeNode *edgenext; //边表
} VertexNode;

//图
typedef struct
{
	VertexNode adjlist[MAX];
	int Vnum; //顶点个数
	int Enum; //边的个数
} Graph;

//创建邻接表
void CreatGraph(Graph *G)
{
	int vi, vj, w;
	EdgeNode *s;
	printf("please inter the number of Vertex and Edge:");
	scanf("%d %d", &G->Vnum, &G->Enum);
	getchar();
	//建立顶点表并将其初始化
	for (int i = 0; i < G->Vnum; i++)
	{
		printf("\nplease inter information of the %d Vertex:", i + 1);
		//scanf("%d %c",&G->adjlist[i].vertex, &G->adjlist[i].name);
		scanf("%c %d", &G->adjlist[i].name, &G->adjlist[i].vertex);
		getchar();
		G->adjlist[i].edgenext = NULL;
	}
	//建立边表-前插法
	//printf("\n建立边表\n");
	printf("Enter the linked vertex subscripts and weights:\n");
	for (int j = 0; j < G->Enum; j++)
	{
		scanf("%d %d %d", &vi, &vj, &w);
		vi -= 1;
		vj -= 1;
		s = (EdgeNode *)malloc(sizeof(EdgeNode));
		s->adjvex = vj;
		s->weight = w;
		s->next = G->adjlist[vi].edgenext;
		G->adjlist[vi].edgenext = s;
		//无向图需要对称，上下两者都要写
		//有向图分为邻接表和逆邻接表，邻接表确定顶点的出度，逆邻接表确定顶点的入度
		//上面是有向图邻接表（出度），下面是逆邻接表（入度），要分开实现
		//s = (EdgeNode*)malloc(sizeof(EdgeNode));
		//s->adjvex = vi;
		//s->weight = w;
		//s->next = G->adjlist[vj].edgenext;
		//G->adjlist[vj].edgenext = s;
	}
}
//显示连接表
void Print(Graph *G)
{
	printf("Display vertex information:\n");
	for (int i = 0; i < G->Vnum; i++)
	{
		printf("%c ", G->adjlist[i].name);
	}
	printf("\n");
	for (int i = 0; i < G->Vnum; i++)
	{
		EdgeNode *q = G->adjlist[i].edgenext;
		printf("%c(%d)---", G->adjlist[i].name, i + 1);
		while (1)
		{
			if (q == NULL)
			{
				printf("^");
				break;
			}
			printf("(w=%d)->%d--->", q->weight, q->adjvex + 1);
			q = q->next;
		}
		printf("\n");
	}
}

//邻接表的深度优先搜索
void DFS(Graph *G, int i)
{
	EdgeNode *p;
	visited[i] = 1;
	printf("%c->", G->adjlist[i].name);
	p = G->adjlist[i].edgenext; //让p指向边表的第一个结点
	while (p)
	{
		if (!visited[p->adjvex])
		{
			DFS(G, p->adjvex);
		}
		p = p->next;
	}
}
void DFSTraverse(Graph *G)
{
	for (int i = 0; i < G->Vnum; i++)
	{
		visited[i] = 0; //初始化标记数组为0
	}
	for (int i = 0; i < G->Vnum; i++)
	{
		if (!visited[i])
		{
			DFS(G, i);
		}
	}
}

//广度优先遍历
typedef struct
{
	int front;
	int rear;
	int count;
	int data[MAX];
} CirQueue;
void InitQueue(CirQueue *Q)
{
	Q->front = Q->rear = 0;
	Q->count = 0;
}
int QueueEmpty(CirQueue *Q)
{
	return Q->count == 0;
}
void EnQueue(CirQueue *Q, int x)
{
	Q->count++;
	Q->data[Q->rear] = x;
	Q->rear = (Q->rear + 1) % MAX;
}
int DeQueue(CirQueue *Q)
{
	int temp;
	if (QueueEmpty(Q))
	{
		printf("Queue underflow");
		return 0;
	}
	else
	{
		temp = Q->data[Q->front];
		Q->count--;
		Q->front = (Q->front + 1) % MAX;
		return temp;
	}
}
void BFS(Graph *G, int k)
{
	int i;
	CirQueue Q;
	EdgeNode *p;
	InitQueue(&Q);						//队列初始化
	printf("%c->", G->adjlist[k].name); //访问第一个点k
	visited[k] = 1;
	EnQueue(&Q, k); //第k顶点已访问，将其序号人队
	while (!QueueEmpty(&Q))
	{					 //队非空则执行
		i = DeQueue(&Q); //相当于i出队
		p = G->adjlist[i].edgenext;
		while (p)
		{
			if (!visited[p->adjvex])
			{												//若j未访问过
				printf("%c->", G->adjlist[p->adjvex].name); //访问vj
				visited[p->adjvex] = 1;
				EnQueue(&Q, p->adjvex); //访问过的vj人队
			}
			p = p->next; //找vi的下一邻接点
		}
	}
}
void BFSTraverse(Graph *G)
{
	int i;
	for (i = 0; i < G->Vnum; i++)
		visited[i] = 0;
	for (i = 0; i < G->Vnum; i++)
		if (!visited[i])
			BFS(G, i);
}

//图的拓扑排序
void Topological_sort(Graph *G, int n) //n是顶点数
{
	EdgeNode *p;
	int m = 0, j, k;
	int *a = (int *)malloc(n * sizeof(int));
	for (int i = 0; i < n; i++)
	{
		a[i] = 0;
	}
	for (int i = 0; i < n; i++) //统计各个顶点的入度情况并填入数组
	{
		p = G->adjlist[i].edgenext;
		while (p)
		{
			j = p->adjvex;
			a[j]++;
			p = p->next;
		}
	}
	int top = -1;
	for (int i = 0; i < n; i++)
	{
		if (a[i] == 0)
		{
			a[i] = top;
			top = i;
		}
	}
	while (top != -1)
	{
		j = top;
		top = a[top];
		printf("%4d", j + 1);
		m++; //统计顶点
		p = G->adjlist[j].edgenext;
		while (p)
		{
			k = p->adjvex; //和l相连的点
			a[k]--;
			if (a[k] == 0)
			{
				a[k] = top;
				top = k;
			}
			p = p->next;
		}
	}
	if (m < n)
		printf("error\n");
	free(a);
}

int main()
{
	Graph G;
	CreatGraph(&G);
	Print(&G);

	printf("\nDFS:\n");
	DFSTraverse(&G);

	printf("\nBFS:\n");
	BFSTraverse(&G);

	int w;
	printf("\nplease inter the num of vertex:");
	scanf("%d", &w);
	Topological_sort(&G, w);

	system("pause");
	return 0;
}